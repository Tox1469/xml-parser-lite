[![CI](https://img.shields.io/github/actions/workflow/status/Tox1469/xml-parser-lite/ci.yml?style=flat-square&label=ci)](https://github.com/Tox1469/xml-parser-lite/actions)
[![License](https://img.shields.io/github/license/Tox1469/xml-parser-lite?style=flat-square)](LICENSE)
[![Release](https://img.shields.io/github/v/release/Tox1469/xml-parser-lite?style=flat-square)](https://github.com/Tox1469/xml-parser-lite/releases)
[![Stars](https://img.shields.io/github/stars/Tox1469/xml-parser-lite?style=flat-square)](https://github.com/Tox1469/xml-parser-lite/stargazers)

---

# xml-parser-lite

Parser XML mínimo que converte em JSON: elementos, atributos e texto.

## Instalação

```bash
npm install xml-parser-lite
```

## Uso

```ts
import { parseXML } from "xml-parser-lite";

const node = parseXML("<root><a id=\"1\">hi</a></root>");
```

## API

- `parseXML(xml: string): XmlNode` — estrutura `{ tag, attrs, children, text }`.

## Licença

MIT