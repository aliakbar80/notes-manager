interface Note {
  id?: number;
  title: string;
  content: string;
}

export const saveToIndexedDB = (data: Note, dbName: string, storeName: string): void => {
  const request = window.indexedDB.open(dbName, 1);

  request.onsuccess = (event) => {
    const db = (event.target as IDBRequest).result as IDBDatabase;
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);

    // Check if data should be added or updated
    if (data.id) {
      store.put(data); 
      console.log('Data updated in IndexedDB:', data);
    } else {
      store.add(data);
      console.log('Data saved to IndexedDB:', data);
    }

    transaction.oncomplete = () => {
      console.log('Transaction completed');
    };

    transaction.onerror = (error) => {
      console.error('Error saving data to IndexedDB:', error);
    };
  };

  request.onerror = (error) => {
    console.error('Error opening IndexedDB:', error);
  };

  request.onupgradeneeded = (event) => {
    const db = (event.target as IDBRequest).result as IDBDatabase;
    // Create objectStore if it doesn't exist
    if (!db.objectStoreNames.contains(storeName)) {
      const store = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
      console.log(`Store ${storeName} created in IndexedDB.`);
    }
  };
};

// Retrieve data from IndexedDB
export const getFromIndexedDB = (dbName: string, storeName: string, key: number, callback: (data: Note | undefined) => void): void => {
  const request = window.indexedDB.open(dbName, 1);

  request.onsuccess = (event) => {
    const db = (event.target as IDBRequest).result as IDBDatabase;
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);

    const getRequest = store.get(key);

    getRequest.onsuccess = () => {
      callback(getRequest.result); 
    };

    getRequest.onerror = (error) => {
      console.error('Error fetching data from IndexedDB:', error);
    };
  };

  request.onerror = (error) => {
    console.error('Error opening IndexedDB:', error);
  };
};

// Delete data from IndexedDB
export const deleteFromIndexedDB = (dbName: string, storeName: string, key: number): void => {
  const request = window.indexedDB.open(dbName, 1);

  request.onsuccess = (event) => {
    const db = (event.target as IDBRequest).result as IDBDatabase;
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);

    const deleteRequest = store.delete(key);

    deleteRequest.onsuccess = () => {
      console.log('Data deleted from IndexedDB');
    };

    deleteRequest.onerror = (error) => {
      console.error('Error deleting data from IndexedDB:', error);
    };
  };

  request.onerror = (error) => {
    console.error('Error opening IndexedDB:', error);
  };
};

// Search data in IndexedDB
export const searchInIndexedDB = (dbName: string, storeName: string, query: string, callback: (data: Note[]) => void): void => {
  const request = window.indexedDB.open(dbName, 1);

  request.onsuccess = (event) => {
    const db = (event.target as IDBRequest).result as IDBDatabase;
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);

    const index = store.index('title'); 
    const range = IDBKeyRange.only(query);
    const getRequest = index.openCursor(range);

    const results: Note[] = [];

    getRequest.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result as IDBCursorWithValue;
      if (cursor) {
        results.push(cursor.value);
        cursor.continue();
      } else {
        callback(results); 
      }
    };

    getRequest.onerror = (error) => {
      console.error('Error searching data in IndexedDB:', error);
    };
  };

  request.onerror = (error) => {
    console.error('Error opening IndexedDB:', error);
  };
};
