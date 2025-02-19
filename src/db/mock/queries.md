# Mock query data

## Users

```sh
db.insert(inventoryManagerUsers).values([
  {
    id: "9091fb85-c359-4f0c-a4d4-90f6a6540d37",
    email: "john@example.com",
    hashedPassword: "password",
  },
  {
    id: "d45da78e-37b0-45a7-b737-5bb3ea896239",
    email: "jane@example.com",
    hashedPassword: "password",
  },
]).returning();
```

## Owners

```sh
db.insert(inventoryManagerOwners).values([
  {
    id: "32c19050-8b4d-4f05-98d6-e9ba835bbdd9",
    userId: "9091fb85-c359-4f0c-a4d4-90f6a6540d37",
    name: "John Doe",
    imageUrl: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: "93fa9a62-3463-44e6-bd18-ca1121fc7577",
    name: "Jane Doe",
    imageUrl: "https://i.pravatar.cc/150?img=30",
  },
]).returning();
```

## Locations

```sh
db.insert(inventoryManagerLocations).values([
  {
    id: "26437f2f-11d3-43fe-a9b0-d3051497dde1",
    name: "Main Office",
    description: "Headquarters",
  },
  {
    id: "07367a7b-7ec0-403c-a151-d6eb257e7108",
    name: "Warehouse",
    description: "Storage facility",
  },
]).returning();
```

## Assets

```sh
db.insert(inventoryManagerAssets).values([
  {
    id: "52531e24-37fe-48d5-8d78-6aecdfd70dcb",
    ownerId: "93fa9a62-3463-44e6-bd18-ca1121fc7577",
    title: "Laptop",
    description: "MacBook Pro 16-inch",
    imageUrl: "https://example.com/laptop.jpg",
    quantity: 1,
    serialNumber: "MBP123456",
    macAddress: "00:1A:2B:3C:4D:5E",
    modelNumber: "A2485",
    manufacturer: "Apple",
    manualPdfUrl: "https://example.com/manual.pdf",
    locationId: "26437f2f-11d3-43fe-a9b0-d3051497dde1",
  },
  {
    id: "ba4bc50b-4fd0-4423-bec2-421dd9758776",
    ownerId: "93fa9a62-3463-44e6-bd18-ca1121fc7577",
    title: "Printer",
    description: "HP LaserJet",
    imageUrl: "https://example.com/printer.jpg",
    quantity: 2,
    serialNumber: "HP123456",
    macAddress: "00:1B:2C:3D:4E:5F",
    modelNumber: "M404dn",
    manufacturer: "HP",
    manualPdfUrl: "https://example.com/printer-manual.pdf",
    locationId: "07367a7b-7ec0-403c-a151-d6eb257e7108",
  },
]).returning();
```

## Barcodes

```sh
db.insert(inventoryManagerBarcodes).values([
  {
    id: 1,
    assetId: "52531e24-37fe-48d5-8d78-6aecdfd70dcb",
    barcodeType: "QR",
    barcodeData: "1234567890",
    metadata: { scannedBy: "Admin", scanDate: new Date().toISOString() },
  },
  {
    id: 2,
    assetId: "ba4bc50b-4fd0-4423-bec2-421dd9758776",
    barcodeType: "UPC",
    barcodeData: "0987654321",
    metadata: { scannedBy: "Manager", scanDate: new Date().toISOString() },
  },
]).returning();
```
