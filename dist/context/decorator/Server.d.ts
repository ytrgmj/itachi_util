/**
 * 在上下文注册builder
 */
export default function (beanId?: string, single?: boolean): <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {};
    beanId: string;
    __needReg: string;
} & T;
