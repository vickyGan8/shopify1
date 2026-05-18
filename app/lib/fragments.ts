// B2B Product & Collection fragments for EasyTime
// No cart/checkout — catalog + inquiry only

export const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment ProductItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    metafields(identifiers: [
      {namespace: "app", key: "moq"},
      {namespace: "app", key: "material"}
    ]) {
      key
      value
    }
  }
` as const;

export const PRODUCT_DETAIL_FRAGMENT = `#graphql
  fragment ProductDetail on Product {
    id
    title
    handle
    vendor
    descriptionHtml
    featuredImage {
      id
      url
      altText
      width
      height
    }
    metafields(identifiers: [
      {namespace: "app", key: "moq"},
      {namespace: "app", key: "lead_time_days"},
      {namespace: "app", key: "sample_available"},
      {namespace: "app", key: "material"}
    ]) {
      key
      value
    }
  }
` as const;

export const COLLECTION_FRAGMENT = `#graphql
  fragment CollectionItem on Collection {
    id
    title
    handle
    image {
      id
      url
      altText
      width
      height
    }
  }
` as const;
