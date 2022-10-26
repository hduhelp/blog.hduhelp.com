import { getInfoFromUrl } from 'image-size-cf'

const probeImageSize = async (url: string) => {
  const dim = await getInfoFromUrl(url)
  return { width: dim.width, height: dim.height }
}

export default probeImageSize
