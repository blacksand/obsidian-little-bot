import { setProjectAnnotations } from '@storybook/preact-vite'
import { beforeAll } from 'vitest'

import previewAnnotations from './preview'

const annotations = setProjectAnnotations([previewAnnotations])

// Run Storybook's beforeAll hook
beforeAll(annotations.beforeAll)
