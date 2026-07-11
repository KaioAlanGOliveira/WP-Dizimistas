import { Routes } from '@angular/router';
import { Fiel } from './componentes/fiel/fiel';
import { Pagamento } from './componentes/pagamento/pagamento';
import { Inicio } from './componentes/inicio/inicio';

export const routes: Routes = [
    {
        path: 'Fiel',
        component: Fiel
    },
    {
        path: 'pagamento',
        component: Pagamento
    },
    {
        path: '',
        component: Inicio
    },
    {
        path: '**',
        redirectTo: ''
    }

];
