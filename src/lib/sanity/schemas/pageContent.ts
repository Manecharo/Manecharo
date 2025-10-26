export default {
  name: "pageContent",
  title: "Page Content",
  type: "document",
  fields: [
    {
      name: "pageId",
      title: "Page ID",
      type: "string",
      options: {
        list: [
          { title: "Landing Page", value: "landing" },
          { title: "About Page", value: "about" },
          { title: "Capabilities Page", value: "capabilities" },
          { title: "Contact Page", value: "contact" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "content",
      title: "Content",
      type: "object",
      fields: [
        {
          name: "tagline",
          title: "Tagline",
          type: "text",
        },
        {
          name: "stats",
          title: "Stats",
          type: "text",
        },
        {
          name: "intro",
          title: "Intro Text",
          type: "text",
        },
        {
          name: "sections",
          title: "Sections",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "heading",
                  title: "Heading",
                  type: "string",
                },
                {
                  name: "body",
                  title: "Body",
                  type: "text",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
