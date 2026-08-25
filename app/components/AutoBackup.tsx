"use client";

import { useEffect } from "react";

type Product = {
  id: number;
  name: string;
  cost: number;
  price: number;
  quantity: number;
};

type Sale = {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  total: number;
  profit: number;
  date: string;
};

type AutoBackup = {
  app: "SAMO Business AI";
  version: 2;
  createdAt: string;
  products: Product[];
  sales: Sale[];
};

const PRODUCTS_KEY = "samo_products";
const SALES_KEY = "samo_sales";
const AUTO_BACKUP_KEY = "samo_auto_backup";

export default function AutoBackup() {
  useEffect(() => {
    let lastSnapshot = "";

    const saveSnapshot = () => {
      try {
        const productsRaw = localStorage.getItem(PRODUCTS_KEY);
        const salesRaw = localStorage.getItem(SALES_KEY);

        if (!productsRaw && !salesRaw) return;

        const products: Product[] = productsRaw
          ? JSON.parse(productsRaw)
          : [];

        const sales: Sale[] = salesRaw
          ? JSON.parse(salesRaw)
          : [];

        if (!Array.isArray(products) || !Array.isArray(sales)) {
          return;
        }

        const snapshotData = JSON.stringify({
          products,
          sales,
        });

        if (snapshotData === lastSnapshot) {
          return;
        }

        const backup: AutoBackup = {
          app: "SAMO Business AI",
          version: 2,
          createdAt: new Date().toISOString(),
          products,
          sales,
        };

        localStorage.setItem(
          AUTO_BACKUP_KEY,
          JSON.stringify(backup)
        );

        lastSnapshot = snapshotData;
      } catch (error) {
        console.error(
          "SAMO auto backup error:",
          error
        );
      }
    };

    saveSnapshot();

    const timer = window.setInterval(
      saveSnapshot,
      2000
    );

    const onStorage = () => {
      saveSnapshot();
    };

    window.addEventListener(
      "storage",
      onStorage
    );

    return () => {
      window.clearInterval(timer);

      window.removeEventListener(
        "storage",
        onStorage
      );
    };
  }, []);

  return null;
}
