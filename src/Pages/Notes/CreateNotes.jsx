import React, { useRef } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form'
import { Input } from '@/Components/ui/input'
import { Button } from '@/Components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { Textarea } from '@/Components/ui/textarea'
import { toast } from 'react-toastify'
import { Card, CardContent } from '@/components/ui/card'
import NoteService from '@/Service/NoteService'
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const CreateNotes = ({setIsOpen,getNotes}) => {
    const formRef = useRef(null)
    const formSchema = z.object({
      
        title: z
            .string({
                message: 'note is required',
            })
            .min(1, {
                message: 'note is required',
            }),
    })
    const navigate = useNavigate()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
           
            title: '',
        },
    })

    async function onSubmit(values) {
        try {
            const resp = await NoteService.createNote(values)
            if (resp.data.success) {
                const searchParams = new URLSearchParams(location.search)
                const page = searchParams.get('page')
                if (page) {
                    navigate('/master-settings/notes')
                } else {
                    getNotes()
                }
                setIsOpen(false)
                //navigate('/master-settings/notes')
            }
        } catch (err) {}
    }

    function onError(errors, e) {
        const errorKeys = Object.keys(errors)
        if (errorKeys.length > 0 && errors[errorKeys[0]]?.message) {
            toast.error(errors[errorKeys[0]].message)
        } else {
            toast.error('Something went wrong.')
        }
    }

    const handleSaveClick = () => {
        if (formRef.current) {
            formRef.current.requestSubmit()
        }
    }
    return (
    
           <> <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Notes</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel>Notes</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="shadow-none focus-visible:ring-transparent space-0 mt-0"
                                            placeholder="Notes"
                                            {...field}
                                            rows="6"
                                        ></Textarea>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end">
                            <Button type="submit" className="bg-primary-purpal hover:bg-primary-purpal">
                                Submit
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent></>
        
    )
}

export default CreateNotes
