function Clamp(lineNum: number, tagele: any) {
  const element = tagele
  if (element.classList.contains('clamp-auto')) return
  element.classList.add('clamp-auto')
  /* 获取原文本 */
  const text = element.textContent
  const textarr = text.split('')
  /* 临时存放数值 */
  let num1 = 0
  const pattern = '[\\u4E00-\\u9FFF]+$'
  for (let j = 0; j < textarr.length; j++) {
    const regzn = new RegExp(`${pattern}`, 'g')
    if (!regzn.test(textarr[j])) {
      /* 非中文字符 */
      num1 = num1 + 1
    } else {
      num1 = num1 + 2
    }
  }
  /* 获取原文本内容长度 */
  const totalTextLen = num1

  /* 获取文本容器宽度 */
  const baseWidth = window.getComputedStyle(element).width
  /* 获取文本字体大小 */
  const baseFontSize = window.getComputedStyle(element).fontSize
  /* 获取单行文本宽度 >> 即文本容器宽度css属性值转换成数字 */
  const lineWidth = +baseWidth.slice(0, -2)
  /* 获取单行文本内容个数 */
  const strNum = Math.floor(lineWidth / +baseFontSize.slice(0, -2))
  /* 定义最终输出内容 */
  let content = ''
  /* 定义最终文本容器可容纳文本长度--->统一转成英文字符计算 */
  const totalStrNum = Math.floor(strNum * lineNum) * 2
  const lastIndex = totalTextLen - totalStrNum
  /* 定义最终文本截取位置 */
  const lastplace = -3 - lastIndex
  if (totalTextLen > totalStrNum) {
    content = text.slice(0, lastplace / 2).concat('...')
  } else {
    content = text
  }
  element.innerHTML = content
}
export default Clamp
