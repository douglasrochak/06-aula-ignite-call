import { Box, styled } from '@doro-ui/react'

export const Container = styled(Box, {
  display: 'grid',
  gridTemplateColumns: '1fr',
  position: 'relative',

  padding: 0,
  margin: '$6 auto 0',
  width: 540,
})
