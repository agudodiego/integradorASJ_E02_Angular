import { CanActivateFn } from "@angular/router";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { UsuarioService } from "../usuario.service";

export const autorizacionGuardFn: CanActivateFn = () => {
    const usuarioService = inject(UsuarioService);
    const routerService = inject(Router);

    const usuario = usuarioService.usuarioLogeado;
    console.log(usuario)
    if (usuario == undefined || usuario.usuario == '') {
        routerService.navigate(['/login']);
        return false;
    }

    return true;
}