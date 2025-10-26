export default {
  name: "project",
  title: "Project",
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
      name: "year",
      title: "Year",
      type: "number",
      validation: (Rule: any) => Rule.required().min(2000).max(2030),
    },
    {
      name: "role",
      title: "Role",
      type: "string",
    },
    {
      name: "challenge",
      title: "The Challenge",
      type: "text",
      rows: 5,
    },
    {
      name: "approach",
      title: "What I Did",
      type: "text",
      rows: 5,
    },
    {
      name: "results",
      title: "The Result",
      type: "array",
      of: [{ type: "string" }],
      description: "Bullet points (use → for arrows)",
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Product Design", value: "product-design" },
          { title: "UX/UI Design", value: "ux-ui-design" },
          { title: "Branding & Identity", value: "branding-identity" },
          { title: "Social Impact", value: "social-impact" },
          { title: "Graphic Design", value: "graphic-design" },
          { title: "3D Modeling & Rendering", value: "3d-modeling-rendering" },
          { title: "Strategy & Consulting", value: "strategy-consulting" },
          { title: "Web Design", value: "web-design" },
          { title: "Photography & Video", value: "photography-video" },
          { title: "Communication Strategy", value: "communication-strategy" },
          { title: "Technical Design", value: "technical-design" },
          { title: "Project Management", value: "project-management" },
        ],
      },
      validation: (Rule: any) => Rule.max(5),
    },
    {
      name: "images",
      title: "Gallery Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required().min(1).max(5),
    },
    {
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      description: "Show on homepage",
      initialValue: false,
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
    },
  ],
  preview: {
    select: {
      title: "title",
      year: "year",
      media: "images.0",
    },
    prepare(selection: any) {
      const { title, year, media } = selection;
      return {
        title: title,
        subtitle: year ? `${year}` : "No year set",
        media: media,
      };
    },
  },
};
