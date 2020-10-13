/**
 * 在上下文注册builder
 */
export default function (componentId: string, beanId?: string, single?: boolean): <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {};
    beanId: string;
    componentId: string;
    __needReg: string;
} & T;
