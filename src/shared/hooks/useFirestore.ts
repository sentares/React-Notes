import {
	collection,
	doc,
	getDocs,
	addDoc,
	updateDoc,
	deleteDoc,
	getDoc,
	serverTimestamp,
} from 'firebase/firestore'
import { db } from '@/shared/lib/firebase'

export const apiPaths = {
	notes: 'notes',
} as const

export const useFirestore = () => {
	const getAll = async (path: string) => {
		const collectionRef = collection(db, path)
		const response = await getDocs(collectionRef)
		return response.docs.map(doc => ({ id: doc.id, ...doc.data() }))
	}

	const getOne = async (path: string, id: string) => {
		const documentRef = doc(db, path, id)
		const response = await getDoc(documentRef)
		if (response.exists()) return { id: response.id, ...response.data() }
		else throw new Error('Document not found')
	}

	const add = async (path: string, data: { title: string }) => {
		const collectionRef = collection(db, path)
		const documentRef = await addDoc(collectionRef, {
			...data,
			createdAt: serverTimestamp(),
		})
		return documentRef.id
	}

	const update = async (path: string, id: string, data: { title: string }) => {
		const documentRef = doc(db, path, id)
		await updateDoc(documentRef, data)
	}

	const remove = async (path: string, id: string) => {
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
