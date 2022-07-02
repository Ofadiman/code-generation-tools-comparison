export type MethodResult<
  Class extends new (...args: any) => any,
  Method extends keyof InstanceType<Class>,
> = Awaited<ReturnType<InstanceType<Class>[Method]>>
