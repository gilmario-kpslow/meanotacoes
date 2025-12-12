import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'appErro',
    standalone: true
})
export class ErroPipe implements PipeTransform {

    transform(value: any, ...args: any[]) {
        if (!value) {
            return;
        }

        const mensagem = Object.keys(value).map((k, v) => {
            switch (k) {
                case 'required': return 'Campo obrigatório';
                case 'minlength': return `Tamanho mínimo aceito ${value[k].requiredLength}`;
                case 'maxlength': return `Tamanho maxímo aceito ${value[k].requiredLength}`;
                case 'email': return `Email inválido`;
                default: return k.startsWith('app') ? `${value[k].mensagem}` : k;
            }
        }).reduce((a, b) => `${a}-${b}`);
        return mensagem;
    }
}
