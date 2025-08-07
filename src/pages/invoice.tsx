
import Logo from "../../public/assets/imgs/dido/Logo-1.png";

import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, Auth, User } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, query, Firestore, CollectionReference, DocumentData } from 'firebase/firestore';
import Image from "next/image";
import shopData from "@/data/shop_data.json";

// Type definitions for shopData and invoice structure
interface ShopItem {
  id: string;
  name: string;
  price: number;
}

interface LineItem {
  product: string;
  quantity: number;
  price: number;
  total?: number; // total is calculated and added before saving
}

interface InvoiceData {
  id?: string; // Firestore document ID
  invoiceNumber: string;
  invoiceDate: string;
  customerName: string;
  customerAddress: string;
  customerEmail: string;
  lineItems: LineItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  notes: string;
  createdAt: string;
  userId: string;
}

// Renamed from 'App' to 'InvoiceApp' to ensure it starts with an uppercase letter
// as required by React for components that use Hooks.
const InvoiceApp = () => {
  // State for authentication and Firebase
  const [db, setDb] = useState<Firestore | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);
  const [loadingFirebase, setLoadingFirebase] = useState<boolean>(true);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);

  // State for password protection
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const CORRECT_PASSWORD = process.env.NEXT_PUBLIC_INVOICE_PASSWORD; // IMPORTANT: Change this to a strong password!

  // State for invoice form data
  const [invoiceNumber, setInvoiceNumber] = useState<string>('');
  const [invoiceDate, setInvoiceDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [customerName, setCustomerName] = useState<string>('');
  const [customerAddress, setCustomerAddress] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>(''); // Using this for "Customer Code"
  const [lineItems, setLineItems] = useState<LineItem[]>([{ product: '', quantity: 1, price: 0 }]);
  const [notes, setNotes] = useState<string>('Payment due within 30 days.');

  // State for calculated values
  const [subtotal, setSubtotal] = useState<number>(0);
  const [taxRate, setTaxRate] = useState<number>(0.08); // 8% tax rate
  const [taxAmount, setTaxAmount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  // State for stored invoices
  const [savedInvoices, setSavedInvoices] = useState<InvoiceData[]>([]);
  const [savingInvoice, setSavingInvoice] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [loadingInvoices, setLoadingInvoices] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Ref for the invoice section to print
  const invoiceRef = useRef<HTMLDivElement>(null);

const flattenProducts = (): ShopItem[] => {
  const items: ShopItem[] = [];

  shopData.forEach(category => {
    category.subcategories.forEach(sub => {
      sub.products.forEach(prod => {
        items.push({
          id: prod.id,
          name: prod.product, // adjust based on your actual product structure
          price: prod.price,  // make sure this is correct
        });
      });
    });
  });

  return items;
};


  // Company details (for the top-left corner)
  const companyLogoUrl= {Logo}
  const companyName: string = "Dido Distributions";
  const companyAddressLine2: string = "Valley Stream, NY, 11581";
  const companyPhone: string = "(516) 727-0114";
  const companyEmail: string = "didodistributions@gmail.com";


  // --- Firebase Initialization and Authentication ---
  useEffect(() => {
    const initializeFirebase = async () => {
      try {
 const appId = process.env.NEXT_PUBLIC_CANVAS_APP_ID || 'default-invoice-app'; // Use a unique ID for your app
  const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // Optional
};

        if (!Object.keys(firebaseConfig).length) {
          throw new Error("Firebase config is missing. Cannot initialize Firebase.");
        }

        const app: FirebaseApp = initializeApp(firebaseConfig);
        const firestoreDb: Firestore = getFirestore(app);
        const firebaseAuth: Auth = getAuth(app);

        setDb(firestoreDb);
        setAuth(firebaseAuth);

        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(firebaseAuth, async (user: User | null) => {
          if (user) {
            setUserId(user.uid);
          } 
          setIsAuthReady(true); // Auth state is ready after initial check
          setLoadingFirebase(false);
        });

        return () => unsubscribe(); // Cleanup auth listener on unmount
      } catch (error: any) {
        console.error("Failed to initialize Firebase:", error);
        setFirebaseError(`Failed to initialize Firebase: ${error.message}`);
        setLoadingFirebase(false);
      }
    };

    initializeFirebase();
  }, []);

  // --- Fetch Saved Invoices ---
  useEffect(() => {
    if (!db || !userId || !isAuthReady) {
      return; // Wait for Firebase and auth to be ready
    }

    setLoadingInvoices(true);
    setLoadError(null);

    try {
      const appId: string = process.env.NEXT_PUBLIC_CANVAS_APP_ID || 'default-app-id';

      // Collection path for private user data
      const invoicesCollectionRef: CollectionReference<DocumentData> = collection(db, 'artifacts', appId, 'users', userId, 'invoices');

      // Listen for real-time updates to the invoices collection
      const q = query(invoicesCollectionRef); // No orderBy to avoid index issues
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const invoices: InvoiceData[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as InvoiceData) // Cast to InvoiceData type
        }));
        // Sort in memory by invoiceDate (descending) and then invoiceNumber
        invoices.sort((a, b) => {
          const dateA = new Date(a.invoiceDate);
          const dateB = new Date(b.invoiceDate);
          if (dateA.getTime() !== dateB.getTime()) {
            return dateB.getTime() - dateA.getTime(); // Latest date first
          }
          return (b.invoiceNumber || '').localeCompare(a.invoiceNumber || ''); // Then by invoice number
        });
        setSavedInvoices(invoices);
        setLoadingInvoices(false);
      }, (error: any) => {
        console.error("Error fetching invoices:", error);
        setLoadError("Failed to load saved invoices.");
        setLoadingInvoices(false);
      });

      return () => unsubscribe(); // Cleanup snapshot listener on unmount
    } catch (error: any) {
      console.error("Error setting up invoice listener:", error);
      setLoadError("Failed to set up invoice listener.");
      setLoadingInvoices(false);
    }
  }, [db, userId, isAuthReady]); // Re-run when db, userId, or auth status changes

  // --- Password Protection Logic ---
  const handlePasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordInput === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      // Using a custom modal for alerts instead of window.alert()
      showCustomAlert('Incorrect password. Please try again.');
      setPasswordInput('');
    }
  };

  // --- Custom Alert Modal State and Functions ---
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const showCustomAlert = (message: string) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const closeCustomAlert = () => {
    setShowAlert(false);
    setAlertMessage('');
  };

  // --- Invoice Calculation Logic ---
  useEffect(() => {
    let currentSubtotal: number = 0;
    lineItems.forEach(item => {
      currentSubtotal += (item.quantity * item.price);
    });
    setSubtotal(currentSubtotal);
    const currentTaxAmount: number = currentSubtotal * taxRate;
    setTaxAmount(currentTaxAmount);
    setTotal(currentSubtotal + currentTaxAmount);
  }, [lineItems, taxRate]);

  // --- Handlers for Invoice Form ---
  const handleProductChange = (index: number, productId: string) => {
    const updatedLineItems: LineItem[] = [...lineItems];
const allProducts = flattenProducts();
const selectedProduct: ShopItem | undefined = allProducts.find(p => p.id === productId);
    if (selectedProduct) {
      updatedLineItems[index] = {
        ...updatedLineItems[index],
        product: selectedProduct.name,
        price: selectedProduct.price,
      };
    } else {
      updatedLineItems[index] = {
        ...updatedLineItems[index],
        product: '',
        price: 0,
      };
    }
    setLineItems(updatedLineItems);
  };

  const handleQuantityChange = (index: number, quantity: string) => {
    const updatedLineItems: LineItem[] = [...lineItems];
    updatedLineItems[index] = { ...updatedLineItems[index], quantity: parseFloat(quantity) || 0 };
    setLineItems(updatedLineItems);
  };

  const handlePriceChange = (index: number, price: string) => {
    const updatedLineItems: LineItem[] = [...lineItems];
    updatedLineItems[index] = { ...updatedLineItems[index], price: parseFloat(price) || 0 };
    setLineItems(updatedLineItems);
  };

  const addLineItem = () => {
    setLineItems([...lineItems, { product: '', quantity: 1, price: 0 }]);
  };

  const removeLineItem = (index: number) => {
    const updatedLineItems: LineItem[] = lineItems.filter((_, i) => i !== index);
    setLineItems(updatedLineItems);
  };

  // --- Save Invoice to Firestore ---
  const saveInvoice = async () => {
    if (!db || !userId) {
      setSaveError("Firebase not initialized or user not authenticated.");
      return;
    }

    setSavingInvoice(true);
    setSaveError(null);

    const invoiceData: Omit<InvoiceData, 'id'> = { // Omit 'id' as it's generated by Firestore
      invoiceNumber,
      invoiceDate,
      customerName,
      customerAddress,
      customerEmail,
      lineItems: lineItems.map(item => ({
        product: item.product,
        quantity: item.quantity,
        price: item.price,
        total: item.quantity * item.price,
      })),
      subtotal,
      taxRate,
      taxAmount,
      total,
      notes,
      createdAt: new Date().toISOString(), // Timestamp for when the invoice was created
      userId: userId, // Store the user ID who created it
    };

    try {
      const appId: string = process.env.NEXT_PUBLIC_CANVAS_APP_ID || 'default-app-id';

      const invoicesCollectionRef: CollectionReference<DocumentData> = collection(db, 'artifacts', appId, 'users', userId, 'invoices');
      await addDoc(invoicesCollectionRef, invoiceData);
      showCustomAlert('Invoice saved successfully!');
      // Optionally clear the form after saving
      clearForm();
    } catch (error: any) {
      console.error("Error saving invoice:", error);
      setSaveError(`Failed to save invoice: ${error.message}`);
    } finally {
      setSavingInvoice(false);
    }
  };

  // --- Print Invoice ---
  const printInvoice = () => {
    window.print();
  };

  // --- Clear Form ---
  const clearForm = () => {
    setInvoiceNumber('');
    setInvoiceDate(new Date().toISOString().slice(0, 10));
    setCustomerName('');
    setCustomerAddress('');
    setCustomerEmail('');
    setLineItems([{ product: '', quantity: 1, price: 0 }]);
    setNotes('Payment due within 30 days.');
  };

  // --- Load Selected Invoice ---
  const loadInvoice = (invoice: InvoiceData) => {
    setInvoiceNumber(invoice.invoiceNumber);
    setInvoiceDate(invoice.invoiceDate);
    setCustomerName(invoice.customerName);
    setCustomerAddress(invoice.customerAddress);
    setCustomerEmail(invoice.customerEmail);
    // Ensure line items are correctly loaded, handling potential missing 'total' field if not saved
    setLineItems(invoice.lineItems.map(item => ({
      product: item.product,
      quantity: item.quantity,
      price: item.price,
    })));
    setNotes(invoice.notes);
    // Recalculate subtotal, tax, total based on loaded line items
    // This will happen automatically due to the useEffect for calculations
  };


  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md password">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Invoice Login</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="flex items-center justify-center">
              <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password:</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                value={passwordInput}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPasswordInput(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 shadow-md"
            >
              Enter
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-500">
            Hint: The password is your_secure_password (change this in code!)
          </p>
        </div>
      </div>
    );
  }

   return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 p-4 sm:p-6 md:p-8">
      {/* Custom Alert Modal */}
      {showAlert && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 no-print">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
            <p className="text-lg font-semibold mb-4">{alertMessage}</p>
            <button
              onClick={closeCustomAlert}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8 md:p-10">
          {/* Firebase Status */}
          <div className="no-print mb-6 text-center text-sm">
            {loadingFirebase ? (
              <p className="text-blue-600">Initializing Firebase...</p>
            ) : firebaseError ? (
              <p className="text-red-600">Firebase Error: {firebaseError}</p>
            ) : (
              <p className="text-green-600">Firebase Ready. User ID: <span className="font-mono text-xs break-all">{userId}</span></p>
            )}
          </div>

          {/* Invoice Form Section */}
          <div ref={invoiceRef} className="invoice-section bg-white p-6 rounded-lg shadow-md mb-8">
            {/* Invoice Header */}
            <div className="flex flex-wrap justify-between items-start mb-8 gap-4">
              {/* Left Section: Logo and Company Info */}
              <div className="flex-shrink-0">
                <Image
                  src={Logo}
                  alt="Company Logo"
                  className="w-24 h-auto rounded-md mb-2"
                  width={100}
                  height={50}
                />
                <p className="text-sm font-semibold text-gray-800">{companyName}</p>
                <p className="text-xs text-gray-600">{companyAddressLine2}</p>
                <p className="text-xs text-gray-600">Phone: {companyPhone}</p>
                <p className="text-xs text-gray-600">Email: {companyEmail}</p>
              </div>

              {/* Right Section: INVOICE title and Invoice Details */}
              <div className="text-right flex-grow customer-info">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-4">INVOICE</h1>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <span className="text-gray-700 font-medium text-right">Invoice Date:</span>
                  <span className="font-semibold text-gray-900 text-left">{invoiceDate}</span>

                  <span className="text-gray-700 font-medium text-right">Invoice #:</span>
                  <span className="font-semibold text-gray-900 text-left">{invoiceNumber}</span>

                  <span className="text-gray-700 font-medium text-right">Customer Email:</span>
                  <span className="font-semibold text-gray-900 text-left">{customerEmail || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="mb-8 border-t pt-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">BILL TO:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-1">
                  <p className="font-semibold text-gray-900">{customerName || 'Company Name'}</p>
                  <p className="text-sm text-gray-700">{customerAddress || '123 Street S.W.'}</p>
                  <p className="text-sm text-gray-700">{customerEmail ? `Email: ${customerEmail}` : 'Email: N/A'}</p>
                </div>
                {/* Input fields for customer details (no-print) */}
                <div className="md:col-span-1 no-print">
                  <div className="mb-2">
                    <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                    <input
                      type="text"
                      id="customerName"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="customerEmail"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="customerAddress" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                      id="customerAddress"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="123 Main St, Anytown, USA 12345"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 no-print">Items</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-gray-100 border-b">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Product</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 w-24">Qty</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 w-32">Price</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 w-32">Total</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 w-16 no-print"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {lineItems.map((item, index) => (
                      <tr key={index} className="border-b last:border-b-0">
                        <td className="py-3 px-4">
                          <select
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 no-print"
                            value={flattenProducts().find(p => p.name === item.product)?.id || ''}

                            onChange={(e) => handleProductChange(index, e.target.value)}
                          >
                            <option value="">Select Product</option>
                            {shopData.map((product) => (
                              <option key={product.id} value={product.id}>{product.name}</option>
                            ))}
                          </select>
                          <span className="print-only">{item.product || 'N/A'}</span>
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 no-print"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(index, e.target.value)}
                            min="1"
                          />
                          <span className="print-only">{item.quantity}</span>
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 no-print"
                            value={item.price.toFixed(2)}
                            onChange={(e) => handlePriceChange(index, e.target.value)}
                            step="0.01"
                          />
                          <span className="print-only">${item.price.toFixed(2)}</span>
                        </td>
                        <td className="py-3 px-4 font-semibold">
                          ${(item.quantity * item.price).toFixed(2)}
                        </td>
                        <td className="py-3 px-4 no-print">
                          <button
                            onClick={() => removeLineItem(index)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={addLineItem}
                className="no-print mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 shadow-sm"
              >
                Add Item
              </button>
            </div>

            {/* Totals Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1 no-print">Notes / Terms</label>
                <textarea
                  id="notes"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 no-print"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Payment terms, special instructions, etc."
                ></textarea>
                <p className="print-only text-sm text-gray-700 mt-2">Notes: {notes}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 font-medium">Subtotal:</span>
                  <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 font-medium">Tax ({taxRate * 100}%):</span>
                  <span className="font-semibold text-gray-900">${taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="text-xl font-bold text-blue-700">Total:</span>
                  <span className="text-xl font-bold text-blue-700">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="no-print flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={saveInvoice}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-200 flex items-center justify-center"
              disabled={savingInvoice || loadingFirebase || !isAuthReady}
            >
              {savingInvoice ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Invoice'
              )}
            </button>
            <button
              onClick={printInvoice}
              className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition duration-200"
            >
              Print Invoice
            </button>
            <button
              onClick={clearForm}
              className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-200"
            >
              Clear Form
            </button>
          </div>
          {saveError && <p className="no-print text-red-600 text-center mb-4">{saveError}</p>}

          {/* Saved Invoices Section */}
          <div className="no-print bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">Saved Invoices</h2>
            {loadingInvoices ? (
              <p className="text-center text-blue-600">Loading saved invoices...</p>
            ) : loadError ? (
              <p className="text-center text-red-600">{loadError}</p>
            ) : savedInvoices.length === 0 ? (
              <p className="text-center text-gray-600">No invoices saved yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-gray-100 border-b">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Invoice #</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Date</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Customer</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Total</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {savedInvoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b last:border-b-0 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-800">{invoice.invoiceNumber}</td>
                        <td className="py-3 px-4 text-sm text-gray-800">{invoice.invoiceDate}</td>
                        <td className="py-3 px-4 text-sm text-gray-800">{invoice.customerName}</td>
                        <td className="py-3 px-4 text-sm text-gray-800">${invoice.total.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => loadInvoice(invoice)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Load
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceApp;
