from __future__ import annotations

import re
import textwrap
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

ART_DIR = ROOT / "src/app/art"
DATA_FILE = ROOT / "src/app/data/artworks.ts"


def prompt(label: str, default: str = "") -> str:
    suffix = f" [{default}]" if default else ""
    value = input(f"{label}{suffix}: ").strip()
    return value or default


def prompt_optional(label: str) -> str:
    return input(f"{label}: ").strip()


def prompt_description(label: str) -> str:
    print(f"{label} (paste text and press Enter):")
    return input("> ").strip()


def slugify(value: str) -> str:
    value = value.strip().lower()
    value = re.sub(r"[^a-z0-9\s-]", "", value)
    value = re.sub(r"[\s_]+", "-", value)
    value = re.sub(r"-+", "-", value)
    return value.strip("-")


def escape_ts_string(value: str) -> str:
    return (
        value.replace("\\", "\\\\")
        .replace('"', '\\"')
        .replace("`", "\\`")
        .replace("${", "\\${")
    )


def build_artwork_page(
    *,
    title: str,
    image: str,
    category: str,
    description: str,
    tools_used: str,
    creation_date: str,
) -> str:
    category_line = (
        f'\n      category="{escape_ts_string(category)}"' if category else ""
    )
    description_line = (
        f'\n      description={{`{escape_ts_string(description)}`}}'
        if description
        else ""
    )
    tools_line = (
        f'\n      toolsUsed="{escape_ts_string(tools_used)}"' if tools_used else ""
    )
    creation_date_line = (
        f'\n      creationDate="{escape_ts_string(creation_date)}"'
        if creation_date
        else ""
    )

    return textwrap.dedent(
        f"""\
        import ArtworkTemplate from '@/app/components/artwork-template';

        export default function ArtworkPage() {{
          return (
            <ArtworkTemplate
              title="{escape_ts_string(title)}"
              image="{escape_ts_string(image)}"{category_line}{description_line}{tools_line}{creation_date_line}
            />
          );
        }}
        """
    )


def build_artwork_entry(
    *,
    slug: str,
    title: str,
    image: str,
    category: str,
    short_description: str,
) -> str:
    lines = [
        "  {",
        f'    slug: "{escape_ts_string(slug)}",',
        f'    title: "{escape_ts_string(title)}",',
        f'    image: "{escape_ts_string(image)}",',
    ]

    if category:
        lines.append(f'    category: "{escape_ts_string(category)}",')
    if short_description:
        lines.append(
            f'    description: "{escape_ts_string(short_description)}",'
        )

    lines.append("  },")
    return "\n".join(lines)


def append_entry_to_data_file(entry: str) -> None:
    if not DATA_FILE.exists():
        raise FileNotFoundError(
            f"{DATA_FILE} does not exist. Create it first before running the script."
        )

    content = DATA_FILE.read_text(encoding="utf-8")
    marker = "];"
    index = content.rfind(marker)

    if index == -1:
        raise ValueError(f'Could not find closing "{marker}" in {DATA_FILE}')

    updated = content[:index].rstrip() + "\n" + entry + "\n" + content[index:]
    DATA_FILE.write_text(updated, encoding="utf-8")


def slug_exists_in_data_file(slug: str) -> bool:
    if not DATA_FILE.exists():
        return False

    content = DATA_FILE.read_text(encoding="utf-8")
    return f'slug: "{slug}"' in content


def main() -> int:
    print("=== New Artwork Generator ===\n")

    title = prompt("Title")
    if not title:
        print("Error: title is required.")
        return 1

    default_slug = slugify(title)
    slug = slugify(prompt("Slug", default_slug))
    if not slug:
        print("Error: invalid slug.")
        return 1

    category = prompt_optional("Category (optional)")
    short_description = prompt_description("Short description (optional)")
    full_description = prompt_description("Full description (optional)")
    tools_used = prompt_optional("Tools used (optional)")
    creation_date = prompt_optional("Creation date (optional)")
    image_name = prompt("Image file name (with extension)", f"{slug}.jpg")
    image = f"/images/art/{image_name}"

    artwork_page_dir = ART_DIR / slug
    page_file = artwork_page_dir / "page.tsx"

    print("\n--- Summary ---")
    print(f"Title        : {title}")
    print(f"Slug         : {slug}")
    print(f"Category     : {category or '-'}")
    print(f"Short desc   : {short_description or '-'}")
    print(f"Full desc    : {full_description or '-'}")
    print(f"Tools used   : {tools_used or '-'}")
    print(f"Creation date: {creation_date or '-'}")
    print(f"Image        : {image}")
    print(f"Detail page  : {page_file}")
    print(f"Data file    : {DATA_FILE}")

    if slug_exists_in_data_file(slug):
        proceed = prompt(
            "An artwork entry with this slug already exists in artworks.ts. Continue anyway? (y/N)",
            "n",
        ).lower()
        if proceed not in {"y", "yes"}:
            print("Aborted.")
            return 0

    if page_file.exists():
        overwrite = prompt("Artwork page already exists. Overwrite page.tsx? (y/N)", "n").lower()
        if overwrite not in {"y", "yes"}:
            print("Aborted.")
            return 0

    artwork_page_dir.mkdir(parents=True, exist_ok=True)

    page_content = build_artwork_page(
        title=title,
        image=image,
        category=category,
        description=full_description,
        tools_used=tools_used,
        creation_date=creation_date,
    )
    page_file.write_text(page_content, encoding="utf-8")

    entry = build_artwork_entry(
        slug=slug,
        title=title,
        image=image,
        category=category,
        short_description=short_description,
    )
    append_entry_to_data_file(entry)

    print("\nDone.")
    print(f"Created detail page: {page_file}")
    print(f"Added artwork entry to: {DATA_FILE}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())