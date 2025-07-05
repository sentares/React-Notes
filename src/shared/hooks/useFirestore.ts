import {
	collection,
	doc,
	getDocs,
	getDoc,
	addDoc,
	updateDoc,
	deleteDoc,
	serverTimestamp,
	type DocumentData,
} from 'firebase/firestore'
import { db } from '@/shared/lib/firebase'

export const apiPaths = {
	notes: 'notes',
	profiles: 'profiles',
} as const

export const useFirestore = () => {
	const getAll = async <T = DocumentData>(path: string): Promise<T[]> => {
		const collectionRef = collection(db, path)
		const snapshot = await getDocs(collectionRef)
		return snapshot.docs.map(
			doc =>
				({
					id: doc.id,
					...doc.data(),
				} as T)
		)
	}

	const getOne = async <T = DocumentData>(
		path: string,
		id: string
	): Promise<T> => {
		const documentRef = doc(db, path, id)
		const snapshot = await getDoc(documentRef)

		if (!snapshot.exists()) {
			throw new Error('Document not found')
		}

		return {
			id: snapshot.id,
			...snapshot.data(),
		} as T
	}

	const add = async <T = DocumentData>(
		path: string,
		data: Partial<T>
	): Promise<string> => {
		const collectionRef = collection(db, path)
		const documentRef = await addDoc(collectionRef, {
			...data,
			createdAt: serverTimestamp(),
		})
		return documentRef.id
	}

	const update = async <T = DocumentData>(
		path: string,
		id: string,
		data: Partial<T>
	): Promise<void> => {
		const documentRef = doc(db, path, id)
		await updateDoc(documentRef, data)
	}

	const remove = async (path: string, id: string): Promise<void> => {
		const documentRef = doc(db, path, id)
		await deleteDoc(documentRef)
	}

	return {
		getAll,
		getOne,
		add,
		update,
		remove,
	}
}
