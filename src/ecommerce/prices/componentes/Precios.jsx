import { PreciosProvider } from './PreciosProvider';
import PreciosTabla from './PreciosTabla';

const Precios = () => {
  return (
    <PreciosProvider> {/* Asegúrate de envolver el componente dentro del provider */}
      <PreciosTabla />
    </PreciosProvider>
  );
};

export default Precios;