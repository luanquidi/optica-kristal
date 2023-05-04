import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IndexUsuariosComponent } from './usuarios/index-usuarios/index-usuarios.component';

@NgModule({
    imports: [RouterModule.forChild([
        { 
            path: 'usuarios', 
            component: IndexUsuariosComponent, 
            children: [] 
        }
    ])],
    exports: [RouterModule]
})
export class ComponentsRoutingModule { }
