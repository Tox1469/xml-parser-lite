/**
 * xml-parser-lite
 * Minimal XML -> JSON parser.
 */

export interface XmlNode {
  tag: string;
  attrs: Record<string, string>;
  children: XmlNode[];
  text: string;
}

function parseAttrs(src: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const re = /([a-zA-Z_:][\w:.-]*)\s*=\s*("([^"]*)"|'([^']*)')/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    attrs[m[1]] = m[3] ?? m[4] ?? "";
  }
  return attrs;
}

export function parseXML(xml: string): XmlNode {
  // Strip declarations and comments.
  let s = xml.replace(/<\?[\s\S]*?\?>/g, "").replace(/<!--[\s\S]*?-->/g, "");
  const root: XmlNode = { tag: "#root", attrs: {}, children: [], text: "" };
  const stack: XmlNode[] = [root];
  const tagRe = /<\/?([a-zA-Z_:][\w:.-]*)([^>]*?)(\/?)>/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = tagRe.exec(s)) !== null) {
    const before = s.slice(last, m.index);
    if (before.trim()) {
      stack[stack.length - 1].text += before;
    }
    const full = m[0];
    const name = m[1];
    const rest = m[2];
    const selfClose = m[3] === "/" || full.endsWith("/>");
    const isClose = full.startsWith("</");
    if (isClose) {
      stack.pop();
    } else {
      const node: XmlNode = {
        tag: name,
        attrs: parseAttrs(rest),
        children: [],
        text: "",
      };
      stack[stack.length - 1].children.push(node);
      if (!selfClose) stack.push(node);
    }
    last = m.index + full.length;
  }
  const tail = s.slice(last);
  if (tail.trim()) root.text += tail;
  // Return first real child if exactly one.
  if (root.children.length === 1 && root.text.trim() === "") {
    return root.children[0];
  }
  return root;
}

export default parseXML;
