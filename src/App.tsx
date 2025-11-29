import GameScreen from './components/GameScreen/GameScreen';
import Layout from './components/Layout';
import { goodSamaritan } from './story/goodSamaritan';

export default function App() {
  return (
    <Layout>
      <GameScreen story={goodSamaritan} />
    </Layout>
  );
}
