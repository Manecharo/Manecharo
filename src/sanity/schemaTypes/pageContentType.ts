import {DocumentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const pageContentType = defineType({
  name: 'pageContent',
  title: 'Page Content',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
      options: {
        list: [
          {title: 'Home - Hero', value: 'home_hero'},
          {title: 'Home - Stats', value: 'home_stats'},
          {title: 'About', value: 'about'},
          {title: 'Work', value: 'work'},
          {title: 'Capabilities', value: 'capabilities'},
          {title: 'Contact', value: 'contact'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          {title: 'English', value: 'en'},
          {title: 'Spanish', value: 'es'},
          {title: 'Italian', value: 'it'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main heading for the section',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 10,
      description: 'Main text content. Use **text** for bold formatting.',
    }),
    defineField({
      name: 'additionalText',
      title: 'Additional Text',
      type: 'text',
      rows: 5,
      description: 'Secondary content if needed',
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      page: 'page',
      language: 'language',
      title: 'title',
    },
    prepare(selection) {
      const {page, language, title} = selection
      const pageLabels: Record<string, string> = {
        home_hero: 'Home - Hero',
        home_stats: 'Home - Stats',
        about: 'About',
        work: 'Work',
        capabilities: 'Capabilities',
        contact: 'Contact',
      }
      const langLabels: Record<string, string> = {
        en: 'EN',
        es: 'ES',
        it: 'IT',
      }
      return {
        title: title || pageLabels[page] || page,
        subtitle: `${pageLabels[page] || page} • ${langLabels[language] || language}`,
      }
    },
  },
})
