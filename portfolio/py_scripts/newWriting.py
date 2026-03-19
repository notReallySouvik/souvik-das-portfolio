from __future__ import annotations

from pathlib import Path
import re
import textwrap

ROOT = Path(__file__).resolve().parent.parent
WRITING_DIR = ROOT / "app/writing"
DATA_FILE = ROOT / "app/data/writings.ts"

VALID_STATUSES = {
    "In Works",
    "In Hiatus",
    "Unreleased",
    "Publishing",
    "Published",
    "Published for Purchase",
    "Coming Soon",
}


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


def parse_tags(raw: str) -> list[str]:
    return [tag.strip() for tag in raw.split(",") if tag.strip()]


def build_tags_array(tags: list[str]) -> str:
    if not tags:
        return "[]"
    joined = ", ".join(f'"{escape_ts_string(tag)}"' for tag in tags)
    return f"[{joined}]"


def build_writing_entry(
    *,
    slug: str,
    title: str,
    category: str,
    tags: list[str],
    publication_status: str,
    short_description: str,
    cover_image: str,
    full_description: str,
    read_link: str,
    buy_link: str,
) -> str:
    lines = [
        "  {",
        f'    slug: "{escape_ts_string(slug)}",',
        f'    title: "{escape_ts_string(title)}",',
    ]

    if category:
        lines.append(f'    category: "{escape_ts_string(category)}",')

    lines.extend(
        [
            f"    tags: {build_tags_array(tags)},",
            f'    publicationStatus: "{escape_ts_string(publication_status)}",',
            f'    coverImage: "{escape_ts_string(cover_image)}",',
            f'    shortDescription: "{escape_ts_string(short_description)}",',
        ]
    )

    if full_description:
        lines.append(f'    fullDescription: "{escape_ts_string(full_description)}",')
    if read_link:
        lines.append(f'    readLink: "{escape_ts_string(read_link)}",')
    if buy_link:
        lines.append(f'    buyLink: "{escape_ts_string(buy_link)}",')

    lines.append("  },")
    return "\n".join(lines)


def build_writing_page(
    *,
    title: str,
    category: str,
    publication_status: str,
    cover_image: str,
    full_description: str,
    read_link: str,
    buy_link: str,
) -> str:
    category_line = f'\n      category="{escape_ts_string(category)}"' if category else ""
    read_line = f'\n      readLink="{escape_ts_string(read_link)}"' if read_link else ""
    buy_line = f'\n      buyLink="{escape_ts_string(buy_link)}"' if buy_link else ""

    return textwrap.dedent(
        f"""\
        import WritingTemplate from '@/app/components/writing-template';

        export default function WritingEntryPage() {{
          return (
            <WritingTemplate
              title="{escape_ts_string(title)}"{category_line}
              publicationStatus="{escape_ts_string(publication_status)}"
              coverImage="{escape_ts_string(cover_image)}"
              description={{`{escape_ts_string(full_description)}`}}{read_line}{buy_line}
            />
          );
        }}
        """
    )


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
    print("=== New Writing Generator ===\n")

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
    tags_raw = prompt("Tags (comma-separated)", "Novel")
    tags = parse_tags(tags_raw)

    publication_status = prompt("Publication status", "In Works")
    if publication_status not in VALID_STATUSES:
        print("\nError: invalid publication status.")
        print("Valid options are:")
        for status in sorted(VALID_STATUSES):
            print(f"  - {status}")
        return 1

    short_description = prompt_description("Short description")
    if not short_description:
        print("Error: short description is required.")
        return 1

    full_description = prompt_description("Full description")
    if not full_description:
        print("Error: full description is required.")
        return 1

    image_name = prompt("Cover image file name (with extension)", f"{slug}.webp")
    cover_image = f"/images/writing/{image_name}"

    read_link = prompt_optional("Read link (optional)")
    buy_link = prompt_optional("Buy link (optional)")

    writing_page_dir = WRITING_DIR / slug
    page_file = writing_page_dir / "page.tsx"

    print("\n--- Summary ---")
    print(f"Title         : {title}")
    print(f"Slug          : {slug}")
    print(f"Category      : {category or '-'}")
    print(f"Tags          : {', '.join(tags) if tags else '-'}")
    print(f"Status        : {publication_status}")
    print(f"Cover image   : {cover_image}")
    print(f"Read link     : {read_link or '-'}")
    print(f"Buy link      : {buy_link or '-'}")
    print(f"Detail page   : {page_file}")
    print(f"Data file     : {DATA_FILE}")

    if slug_exists_in_data_file(slug):
        proceed = prompt(
            "A writing entry with this slug already exists in writings.ts. Continue anyway? (y/N)",
            "n",
        ).lower()
        if proceed not in {"y", "yes"}:
            print("Aborted.")
            return 0

    if page_file.exists():
        overwrite = prompt("Writing page already exists. Overwrite page.tsx? (y/N)", "n").lower()
        if overwrite not in {"y", "yes"}:
            print("Aborted.")
            return 0

    writing_page_dir.mkdir(parents=True, exist_ok=True)

    page_content = build_writing_page(
        title=title,
        category=category,
        publication_status=publication_status,
        cover_image=cover_image,
        full_description=full_description,
        read_link=read_link,
        buy_link=buy_link,
    )
    page_file.write_text(page_content, encoding="utf-8")

    entry = build_writing_entry(
        slug=slug,
        title=title,
        category=category,
        tags=tags,
        publication_status=publication_status,
        short_description=short_description,
        cover_image=cover_image,
        full_description=full_description,
        read_link=read_link,
        buy_link=buy_link,
    )
    append_entry_to_data_file(entry)

    print("\nDone.")
    print(f"Created detail page: {page_file}")
    print(f"Added writing entry to: {DATA_FILE}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())