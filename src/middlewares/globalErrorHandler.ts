export default function globalErrorHandler(
  error: { status: number; message: string },
  req: any,
  res: any,
  next: any
) {
  res.status(error.status || 500).send({
    error: error.message || 'Could not complete operation, please try again'
  });
}
