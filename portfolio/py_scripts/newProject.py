from __future__ import annotations

from pathlib import Path
import re
import sys
import textwrap


PROJECTS_DIR = Path("src/app/projects")
DATA_FILE = Path("src/app/data/projects.ts")


def prompt(label: str, default: str = "") -> str:
    suffix = f" [{default}]" if default else ""
    value = input(f"{label}{suffix}: ").strip()
    return value or default


def prompt_multiline(label: str) -> str:
    print(f"{label} (finish with an empty line):")
    lines: list[str] = []

    while True:
        line = input()
        if line.strip() == "":
            break
        lines.append(line)

    return "\n".join(lines).strip()


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


def build_project_page(
    *,
    title: str,
    description: str,
    tech_stack: str,
    image: str,
    github: str,
    live: str,
) -> str:
    title_safe = escape_ts_string(title)
    description_safe = escape_ts_string(description)
    tech_stack_safe = escape_ts_string(tech_stack)
    image_safe = escape_ts_string(image)

    github_line = f'\n      github="{escape_ts_string(github)}"' if github else ""
    live_line = f'\n      live="{escape_ts_string(live)}"' if live else ""

    return textwrap.dedent(
        f"""\
        import ProjectTemplate from "@/app/components/project-template";

        export default function ProjectPage() {{
          return (
            <ProjectTemplate
              title="{title_safe}"
              description={{`{description_safe}`}}
              techStack="{tech_stack_safe}"
              image="{image_safe}"{github_line}{live_line}
            />
          );
        }}
        """
    )


def build_project_entry(
    *,
    slug: str,
    title: str,
    description: str,
    tech_stack: str,
    image: str,
    github: str,
    live: str,
) -> str:
    lines = [
        "  {",
        f'    slug: "{escape_ts_string(slug)}",',
        f'    title: "{escape_ts_string(title)}",',
        f'    description: "{escape_ts_string(description)}",',
        f'    techStack: "{escape_ts_string(tech_stack)}",',
        f'    image: "{escape_ts_string(image)}",',
    ]

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

    description = prompt_multiline("Short description for cards and project page")
    if not description:
        print("Error: description is required.")
        return 1

    tech_stack = prompt("Tech stack", "Next.js, TypeScript, Tailwind CSS")
    image_name = prompt("Image file name (with extension)", f"{slug}.png")
    image = f"/images/projects/{image_name}"    
    github = prompt("GitHub URL (optional)")
    live = prompt("Live URL (optional)")

    project_dir = PROJECTS_DIR / slug
    page_file = project_dir / "page.tsx"

    print("\n--- Summary ---")
    print(f"Title      : {title}")
    print(f"Slug       : {slug}")
    print(f"Image      : {image}")
    print(f"GitHub     : {github or '-'}")
    print(f"Live       : {live or '-'}")
    print(f"Detail page: {page_file}")
    print(f"Data file  : {DATA_FILE}")

    if slug_exists_in_data_file(slug):
        overwrite_data = prompt(
            "A project with this slug already exists in projects.ts. Continue anyway? (y/N)",
            "n",
        ).lower()
        if overwrite_data not in {"y", "yes"}:
            print("Aborted.")
            return 0

    if page_file.exists():
        overwrite_page = prompt("Project page already exists. Overwrite page.tsx? (y/N)", "n").lower()
        if overwrite_page not in {"y", "yes"}:
            print("Aborted.")
            return 0

    project_dir.mkdir(parents=True, exist_ok=True)

    page_content = build_project_page(
        title=title,
        description=description,
        tech_stack=tech_stack,
        image=image,
        github=github,
        live=live,
    )
    page_file.write_text(page_content, encoding="utf-8")

    entry = build_project_entry(
        slug=slug,
        title=title,
        description=description,
        tech_stack=tech_stack,
        image=image,
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