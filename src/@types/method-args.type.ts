export type MethodArgs<
  Class extends new (...args: any) => any,
  Method extends keyof InstanceType<Class>,
> = Parameters<InstanceType<Class>[Method]>[0]
