const dedent = require('dedent');

(async () => {
  const { compile } = await import("@mdx-js/mdx")

  const file = dedent`
  import { Canvas, Meta, Story, ArgsTable } from '@storybook/addon-docs';
  import { Heading } from './Heading';

  <Meta title="Components/Heading" component={Heading} />

  # MDX 2 Rendering Bugs

  When there's no linebreak between jsx in the story source code, "\n" gets inserted visually in the UI.

  <Canvas>
    <Story name="one">
      <Heading>Lorem ipsum dolor sit amet</Heading>
      <Heading>Lorem ipsum dolor sit amet</Heading>
    </Story>
  </Canvas>

  When there is a linebreak between jsx in the story source code, then there's no "\n" in the UI, and things look normal.

  <Canvas>
    <Story name="two">
      <Heading>Lorem ipsum dolor sit amet</Heading>

      <Heading>Lorem ipsum dolor sit amet</Heading>

    </Story>
  </Canvas>

  When the jsx is multi-line in the source code, then the content gets wrapped in a \<p\> tag when rendered.

  ONLY occurs if the source code itself (the jsx) is multi-line, not if the content itself is rendered on multiple lines and wraps in the UI.

  <Canvas>
    <Story name="three">
      <Heading>I am very long, but am kept on one line in the source code, so there is no wrapper paragraph tag inserted around me. I am very long, but am kept on one line in the source code, so there is no wrapper paragraph tag inserted around me.</Heading>

      <Heading>
        Multi-line in the source code, wrapped in p tag.
      </Heading>

    </Story>
  </Canvas>

  ## Props

  <ArgsTable of={Heading} />
  `;
  const a = await compile(file, {"format":"mdx","rehypePlugins":[],"providerImportSource":"@mdx-js/react"});

  // console.log(a)
})()
