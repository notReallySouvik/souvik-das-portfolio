from __future__ import annotations

import re
import textwrap
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

PROJECTS_DIR = ROOT / "src/app/projects"
DATA_FILE = ROOT / "src/app/data/projects.ts"

VALID_STATUSES = {
    "Planned",
    "In Development",
    "Paused",
    "Completed",
    "Maintained",
    "Archived",
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
    return "[" + ", ".join(f'"{escape_ts_string(tag)}"' for tag in tags) + "]"


def normalize_url(value: str) -> str:
    value = value.strip()
    if not value:
        return value
    if value.startswith(("http://", "https://", "mailto:")):
        return value
    return f"https://{value}"


def build_project_page(
    *,
    title: str,
    description: str,
    tech_stack: str,
    image: str,
    tags: list[str],
    status: str,
    category: str,
    github: str,
    live: str,
) -> str:
    tags_line = f"\n      tags={{{build_tags_array(tags)}}}" if tags else ""
    status_line = f'\n      status="{escape_ts_string(status)}"' if status else ""
    category_line = (
        f'\n      category="{escape_ts_string(category)}"' if category else ""
    )
    github_line = f'\n      github="{escape_ts_string(github)}"' if github else ""
    live_line = f'\n      live="{escape_ts_string(live)}"' if live else ""

    return textwrap.dedent(
        f"""\
        import ProjectTemplate from "@/app/components/project-template";

        export default function ProjectPage() {{
          return (
            <ProjectTemplate
              title="{escape_ts_string(title)}"
              description={{`{escape_ts_string(description)}`}}
              techStack="{escape_ts_string(tech_stack)}"
              image="{escape_ts_string(image)}"{tags_line}{status_line}{category_line}{github_line}{live_line}
            />
          );
        }}
        """
    )


def build_project_entry(
    *,
    slug: str,
    title: str,
    short_description: str,
    tech_stack: str,
    image: str,
    tags: list[str],
    status: str,
    category: str,
    github: str,
    live: str,
) -> str:
    lines = [
        "  {",
        f'    slug: "{escape_ts_string(slug)}",',
        f'    title: "{escape_ts_string(title)}",',
        f'    shortDescription: "{escape_ts_string(short_description)}",',
        f'    techStack: "{escape_ts_string(tech_stack)}",',
        f'    image: "{escape_ts_string(image)}",',
        f"    tags: {build_tags_array(tags)},",
        f'    status: "{escape_ts_string(status)}",',
    ]

    if category:
        lines.append(f'    category: "{escape_ts_string(category)}",')
    if github:
        lines.append(f'    github: "{escape_ts_string(github)}",')
    if live:
        lines.append(f'    live: "{escape_ts_string(live)}",')

    lines.append("  },")
    return "\n".join(lines)


def append_project_to_data_file(entry: str) -> None:
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
    print("=== New Project Generator ===\n")

    title = prompt("Project title")
    if not title:
        print("Error: project title is required.")
        return 1

    default_slug = slugify(title)
    slug = slugify(prompt("Project slug", default_slug))
    if not slug:
        print("Error: invalid slug.")
        return 1

    short_description = prompt_description("Short description")
    if not short_description:
        print("Error: short description is required.")
        return 1

    full_description = prompt_description("Full description for project page")
    if not full_description:
        print("Error: full description is required.")
        return 1

    tech_stack = prompt("Tech stack", "Next.js, TypeScript, Tailwind CSS")
    tags_raw = prompt("Tags (comma-separated)", "Web Dev")
    tags = parse_tags(tags_raw)

    status = prompt("Status", "In Development")
    if status not in VALID_STATUSES:
        print("\nError: invalid status.")
        print("Valid options are:")
        for item in sorted(VALID_STATUSES):
            print(f"  - {item}")
        return 1

    category = prompt_optional("Category (optional)")
    image_name = prompt("Image file name (with extension)", f"{slug}.png")
    image = f"/images/projects/{image_name}"

    github = normalize_url(prompt_optional("GitHub URL (optional)"))
    live = normalize_url(prompt_optional("Live URL (optional)"))

    project_dir = PROJECTS_DIR / slug
    page_file = project_dir / "page.tsx"

    print("\n--- Summary ---")
    print(f"Title        : {title}")
    print(f"Slug         : {slug}")
    print(f"Short desc   : {short_description}")
    print(f"Tech stack   : {tech_stack}")
    print(f"Tags         : {', '.join(tags) if tags else '-'}")
    print(f"Status       : {status}")
    print(f"Category     : {category or '-'}")
    print(f"Image        : {image}")
    print(f"GitHub       : {github or '-'}")
    print(f"Live         : {live or '-'}")
    print(f"Detail page  : {page_file}")
    print(f"Data file    : {DATA_FILE}")

    if slug_exists_in_data_file(slug):
        overwrite_data = prompt(
            "A project with this slug already exists in projects.ts. Continue anyway? (y/N)",
            "n",
        ).lower()
        if overwrite_data not in {"y", "yes"}:
            print("Aborted.")
            return 0

    if page_file.exists():
        overwrite_page = prompt(
            "Project page already exists. Overwrite page.tsx? (y/N)", "n"
        ).lower()
        if overwrite_page not in {"y", "yes"}:
            print("Aborted.")
            return 0

    project_dir.mkdir(parents=True, exist_ok=True)

    page_content = build_project_page(
        title=title,
        description=full_description,
        tech_stack=tech_stack,
        image=image,
        tags=tags,
        status=status,
        category=category,
        github=github,
        live=live,
    )
    page_file.write_text(page_content, encoding="utf-8")

    entry = build_project_entry(
        slug=slug,
        title=title,
        short_description=short_description,
        tech_stack=tech_stack,
        image=image,
        tags=tags,
        status=status,
        category=category,
        github=github,
        live=live,
    )
    append_project_to_data_file(entry)

    print("\nDone.")
    print(f"Created detail page: {page_file}")
    print(f"Added project card data to: {DATA_FILE}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())