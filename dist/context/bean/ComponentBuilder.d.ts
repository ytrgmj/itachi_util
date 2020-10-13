import BeanBuilder from './BeanBuilder';
export default class ComponentBuilder implements BeanBuilder {
    _map: any;
    add(componentId: string, beanId: string): void;
    build(context: Context): Map<any, any>;
    afterBuild(): void;
}
import Context from '../Context';
