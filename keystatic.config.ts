import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },

  singletons: {
    siteSettings: singleton({
      label: 'Site Settings (Header & Footer)',
      path: 'src/content/site-settings/',
      format: { data: 'yaml' },
      schema: {
        phone1: fields.text({ label: 'Primary phone' }),
        phone2: fields.text({ label: 'Secondary phone' }),
        email: fields.text({ label: 'Contact email' }),
        navLinks: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            href: fields.text({ label: 'URL (e.g. /about)' }),
          }),
          {
            label: 'Header navigation links',
            itemLabel: (props) => props.fields.label.value || 'Link',
          }
        ),
        footerTagline: fields.text({
          label: 'Footer tagline',
          multiline: true,
        }),
      },
    }),
  },

  collections: {
    news: collection({
      label: 'News Posts',
      slugField: 'title',
      path: 'src/content/news/*',
      format: { data: 'yaml' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Date' }),
        category: fields.text({ label: 'Category' }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        image: fields.image({
          label: 'Image',
          directory: 'public/images/news',
          publicPath: '/images/news/',
        }),
      },
    }),

    testimonials: collection({
      label: 'Testimonials',
      slugField: 'name',
      path: 'src/content/testimonials/*',
      format: { data: 'yaml' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        relation: fields.text({ label: 'Relation (e.g. Parent of Class X student)' }),
        quote: fields.text({ label: 'Quote', multiline: true }),
        avatar: fields.image({
          label: 'Photo',
          directory: 'public/images/testimonials',
          publicPath: '/images/testimonials/',
        }),
      },
    }),

    gallery: collection({
      label: 'Gallery Items',
      slugField: 'title',
      path: 'src/content/gallery/*',
      format: { data: 'yaml' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        category: fields.text({ label: 'Category' }),
        alt: fields.text({ label: 'Alt text (for accessibility/SEO)' }),
        image: fields.image({
          label: 'Photo',
          directory: 'public/images/gallery',
          publicPath: '/images/gallery/',
        }),
      },
    }),
  },
});
