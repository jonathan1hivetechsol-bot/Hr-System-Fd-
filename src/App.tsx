import Aos from 'aos'
import { useEffect } from 'react'
import ScrollToTop from './components/ScrollToTop'
import AppProvidersWrapper from './components/wrappers/AppProvidersWrapper'
import AppRouter from './routes/router'

function App() {
  useEffect(() => {
    Aos.init()
  }, [])

  return (
    <AppProvidersWrapper>
      <AppRouter />
      <ScrollToTop />
    </AppProvidersWrapper>
  );
}

export default App;
