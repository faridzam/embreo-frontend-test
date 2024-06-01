import { Box, Skeleton } from '@mui/material'
import { useState } from 'react'

interface ICircleImageProps {
  src: string
  alt: string
  size: string
  [key: string]: any
}

const CircleImage = (props: ICircleImageProps) => {
  const { src, alt, size, ...restProps } = props

  const [loaded, setLoaded] = useState<boolean>(false)

  return (
    <Box width={size} height={size}>
      {!loaded && <Skeleton variant="circular" width={size} height={size} />}
      <img
        {...restProps}
        src={src}
        alt={alt}
        style={{
          borderRadius: '100%',
        }}
        height={size}
        width={size}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </Box>
  )
}

export default CircleImage
