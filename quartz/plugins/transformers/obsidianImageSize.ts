import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"

export const ObsidianImageSize: QuartzTransformerPlugin = () => {
  return {
    name: "ObsidianImageSize",
    htmlPlugins() {
      return [
        () => (tree) => {
          visit(tree, "element", (node) => {
            if (node.tagName === "img" && node.properties?.alt) {
              const alt = String(node.properties.alt)
              
              // 匹配模式：纯数字(宽度) 或 数字x数字(宽x高) 或 描述|数字
              const match = alt.match(/^(?:(.*)\|)?(\d+)(?:x(\d+))?$/)
              
              if (match) {
                const [, textPart, width, height] = match
                
                // 设置尺寸
                node.properties.width = width
                if (height) node.properties.height = height
                
                // 清理 alt：如果有文字部分保留，否则为空
                node.properties.alt = textPart || ""
                
                // 添加 data 属性便于 CSS 钩子（可选）
                node.properties["data-size-specified"] = "true"
              }
            }
          })
        },
      ]
    },
  }
}
