function isNil (obj) {
  return obj === null || obj === undefined
}

function queryText (selectors) {
  const result = document.querySelector(selectors)
  if (isNil(result)) {
    return null
  }
  return result.textContent
}

function queryKeyValueArray (selectors, split, subSelectors) {
  const nodes = document.querySelectorAll(selectors)
  const array = []
  if (!isNil(nodes) && nodes.length > 0) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes.item(i)
      if (split != null && split.length > 0) {
        const kv = node.textContent.split(split)
        if (kv.length >= 2) {
          const key = kv[0]
          const value = kv[1]
          array.push({ key, value })
        } else if (kv.length === 1) {
          const key = kv[0]
          array.push({ key, value: undefined })
        }
      } else {
        if (subSelectors != null) {
          const keyNode = !isNil(subSelectors.key) ? node.querySelector(subSelectors.key) : null
          if (keyNode !== null) {
            const valueNode = !isNil(subSelectors.value) ? node.querySelector(subSelectors.value) : null
            const key = keyNode.textContent
            const value = valueNode.textContent

            array.push({ key, value })
          }
        }
      }
    }
  }
  return array
}

function insertHtml (tag, tagId, insertNodeAfterSelectors, attrs, events, html) {
  const insertNode = document.querySelector(`div#${tagId}`)
  if (insertNode !== null) {
    console.log('')
  }

  for (const selector of insertNodeAfterSelectors) {
    const node = document.querySelector(selector)
    if (!isNil(node)) {
      const insertNode = document.createElement(tag)
      const pluginButtonIdAttr = document.createAttribute('id')
      pluginButtonIdAttr.value = tagId
      insertNode.attributes.setNamedItem(pluginButtonIdAttr)

      for (const attrsKey in attrs) {
        const value = attrs[attrsKey]
        const attr = document.createAttribute(attrsKey)
        attr.value = value
        insertNode.attributes.setNamedItem(attr)
      }

      insertNode.innerHTML = html

      for (const eventsKey in events) {
        insertNode[eventsKey] = events[eventsKey]
      }
      !isNil(node.parentNode) && node.parentNode.insertBefore(insertNode, node.nextSibling)
      break
    }
  }
}

let price = queryText('div#corePrice_feature_div > div > div > span.a-price.aok-align-center > span.a-offscreen')
if (isNil(price)) {
  price = queryText('#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center.aok-relative > span.aok-offscreen')
}
const featureArray = queryKeyValueArray('div#productOverview_feature_div tr', null, { key: 'td span', value: 'td:last-of-type span' })

console.log(`price: ${price}`)
console.log(`featureArray: ${JSON.stringify(featureArray)}`)

insertHtml('div', 'buy-button-of-plugin', ['div#buyNow_feature_div', 'div#addToCart_feature_div'], { class: 'a-button-stack' }, {
  onclick: function () {
    console.log('on click')
  }
}, '<span id="submit-a-plugin-buy" class="a-button a-spacing-small a-button-primary a-button-icon natc-enabled"><span class="a-button-inner"> <i class="a-icon a-icon-cart"></i><span class="a-button-text" aria-hidden="true">Buy Buy Buy</span></span></span>')
