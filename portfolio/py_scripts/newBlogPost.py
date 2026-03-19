from __future__ import annotations

import re
import sys
import textwrap
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BLOG_DIR = ROOT / "content/blog"


def prompt(label: str, default: str = "") -> str:
    suffix = f" [{default}]" if default else ""
    value = input(f"{label}{suffix}: ").strip()
    return value or default


def slugify(value: str) -> str:
    value = value.strip().lower()
    value = re.sub(r"[^a-z0-9\s-]", "", value)
    value = re.sub(r"[\s_]+", "-", value)
    value = re.sub(r"-+", "-", value)
    return value.strip("-")


def build_blog_file(
    *,
    title: str,
    slug: str,
    tags: str,
    cover: str,
    excerpt: str,
) -> str:

    today = date.today().isoformat()

    return textwrap.dedent(
        f"""\
        ---
        title: "{title}"
        date: "{today}"
        tags: [{tags}]
        coverImage: "/images/blog/{cover}"
        excerpt: "{excerpt}"
        ---

        ## Introduction

        Write the opening here.

        ## Notes

        Add your thoughts.

        ## Code Example

        ```python
        print("hello world")
        ```

        ## Conclusion

        Wrap up the post.
        """
    )


def main() -> int:

    print("=== New Blog Post Generator ===\n")

    title = prompt("Post title")
    if not title:
        print("Error: title required.")
        return 1

    slug = slugify(prompt("Slug", slugify(title)))

    tags_input = prompt(
        "Tags (comma separated)",
        "devlog",
    )

    tags = ", ".join(f'"{t.strip()}"' for t in tags_input.split(","))

    excerpt = prompt("Short excerpt")

    cover = prompt(
        "Cover image filename",
        f"{slug}.jpg"
    )

    BLOG_DIR.mkdir(parents=True, exist_ok=True)

    file_path = BLOG_DIR / f"{slug}.mdx"

    if file_path.exists():
        overwrite = prompt(
            "Post already exists. Overwrite? (y/N)",
            "n"
        ).lower()

        if overwrite not in {"y", "yes"}:
            print("Aborted.")
            return 0

    content = build_blog_file(
        title=title,
        slug=slug,
        tags=tags,
        cover=cover,
        excerpt=excerpt,
    )

    file_path.write_text(content, encoding="utf-8")

    print("\nDone.")
    print(f"Created blog post: {file_path}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())