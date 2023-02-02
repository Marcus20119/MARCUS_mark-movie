export function getBucketURL(bucket = '', fileName = '') {
  return `https://fnpwntjafdaszvfesblb.supabase.co/storage/v1/object/public/${bucket}/${fileName}`;
}
