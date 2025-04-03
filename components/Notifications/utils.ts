export const removeEmptyODataParamOptions = (oDataQueryOptions: any) => {
  return Object.fromEntries(
    Object.entries(oDataQueryOptions).filter(([_, v]) => v != null)
  );
};

export const extractUserIdFromImageUrl = (imageUrl: string) => {
  const regex =
    /\b([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})\b/g;
  if (imageUrl) {
    const userId = regex.exec(imageUrl)?.[0];
    if (userId) {
      return userId;
    }
  }

  return undefined;
};
