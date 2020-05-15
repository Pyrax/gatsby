import docsSidebar from "../../data/sidebars/doc-links.yaml"
import contributingSidebar from "../../data/sidebars/contributing-links.yaml"
import featuresSidebar from "../../data/sidebars/features-links.yaml"
import tutorialSidebar from "../../data/sidebars/tutorial-links.yaml"

import { getLocaleAndBasePath } from "../i18n"

const createHash = link => {
  let index = -1
  if (link) index = link.indexOf(`#`)
  return index >= 0 ? link.substr(index + 1) : false
}

const extendItem = (items, parentTitle, parentUi, level) => {
  items.forEach(item => {
    item.hash = createHash(item.link)
    item.parentTitle = parentTitle
    if (parentUi) item.parentUi = parentUi
    item.level = level || 1

    if (item.items)
      extendItem(item.items, item.title, item.parentUi, item.level + 1)
  })
}

const extendItemList = itemList => {
  itemList.forEach(section => {
    section.level = 0
    if (section.items) extendItem(section.items, section.title, section.ui)
  })
  return itemList
}

const extendSidebarData = item => {
  return {
    title: item[0].title,
    breadcrumbTitle: item[0].breadcrumbTitle,
    key: item[0].key,
    disableExpandAll: item[0].disableExpandAll,
    disableAccordions: item[0].disableAccordions,
    items: extendItemList(item[0].items),
  }
}

const itemListDocs = extendSidebarData(docsSidebar)
const itemListTutorial = extendSidebarData(tutorialSidebar)
const itemListContributing = extendSidebarData(contributingSidebar)
const itemListFeatures = extendSidebarData(featuresSidebar)

const itemListLookup = {
  docs: itemListDocs,
  contributing: itemListContributing,
  tutorial: itemListTutorial,
  features: itemListFeatures,
}

function getItemList(path) {
  const { basePath } = getLocaleAndBasePath(path)
  const [urlSegment] = basePath.split("/").slice(1)
  return itemListLookup[urlSegment]
}

export {
  itemListDocs,
  itemListTutorial,
  itemListContributing,
  itemListFeatures,
  getItemList,
}
