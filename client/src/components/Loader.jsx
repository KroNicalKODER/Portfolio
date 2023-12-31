import { Html, useProgress } from '@react-three/drei'

function Loader() {
  const { progress } = useProgress()
  const rounded = progress.toFixed(2)
  return <Html className='whitespace-nowrap' center>{rounded} % loaded</Html>
}

export default Loader