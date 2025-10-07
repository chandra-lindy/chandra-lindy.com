# chandra-lindy.com

I created my blog to document and share my learning. In the spirit of sharing, feel free to copy and use any code from this repository as you see fit.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Vercel

## Development

`npm run dev` to start the development server

## License

MIT License

## Version

1.0.0 - Static Blog using Next.js SSG dynamic routing, `gray-matter` &`react-markdown`.

### Workflow

1. To add a new post, create a new markdown file in the `src/content/posts` directory
2. Be sure to use URL friendly names for the files. eg: `my-first-post.md`
3. Add frontmatter to the top of the file. eg:

   ```markdown
   ---
   title: My First Post
   date: 2022-01-01
   description: This is my first post
   ---
   ```

4. Add your content below the frontmatter
5. Add a main image for the post in the `public/images/blog/post-title/post-title-main-image.png` directory. Follow the naming convention. This image is expected to be unique. ie: no main image of the same name with different format can exist in the directory.
6. Add any additional images for the post in the `public/images/blog/post-title/` directory if necessary and link to them in the markdown file using markdown syntax. eg: `![Alt Text](/images/blog/post-title/image-name.png)`
7. The following markdown syntax is supported/styled:
   - Headings
   - Bold
   - Italic
   - Unordered Lists
   - Ordered Lists
   - Links
   - Images
   - Code
   - Blockquotes
8. To customize the styling of the markdown posts, you can modify the `src/app/blog/[slug]/page.tsx` file
9. To customize the styling of the blog page, you can modify the `src/app/blog/page.tsx` file
10. To customize or add additional front-matter fields, you can modify the helper functions in `src/lib/posts.ts`

### Future Improvements

- Improve frontend styling
- Add categories to posts

## Future Versions

- 2.0.0 - Migrate to DB backend

## Contact

To connect with me for any reason, seek advice, give advice, collaborate, or just say hello, reach out to me on:

- [X](https://x.com/ChandraLindy)
- [LinkedIn](https://linkedin.com/in/chandra-lindy)
