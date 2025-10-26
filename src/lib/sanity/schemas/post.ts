export default {
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "postType",
      title: "Post Type",
      type: "string",
      options: {
        list: [
          { title: "Writing", value: "writing" },
          { title: "Video", value: "video" },
          { title: "Audio", value: "audio" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      description: "Optional - defaults to geometric pattern",
      options: {
        hotspot: true,
      },
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
      hidden: ({ document }: any) => document?.postType !== "writing",
    },
    {
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "YouTube or Vimeo URL",
      hidden: ({ document }: any) => document?.postType !== "video",
    },
    {
      name: "audioFile",
      title: "Audio File",
      type: "file",
      options: {
        accept: "audio/*",
      },
      hidden: ({ document }: any) => document?.postType !== "audio",
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    },
  ],
  preview: {
    select: {
      title: "title",
      postType: "postType",
      media: "featuredImage",
    },
    prepare(selection: any) {
      const { title, postType, media } = selection;
      return {
        title: title,
        subtitle: postType?.toUpperCase() || "POST",
        media: media,
      };
    },
  },
};
