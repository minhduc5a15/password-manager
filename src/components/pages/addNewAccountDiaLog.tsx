'use client';

import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle, Input, Label, ScrollArea } from '@/components/ui';
import React, { useState, useRef, useEffect } from 'react';
import { Eye, Plus, EyeOff, X } from 'lucide-react';
import { checkStrengthPassword } from '@/lib/utils';
import axios from 'axios';

export interface AddNewAccountDiaLog extends React.HTMLAttributes<HTMLButtonElement> {
    isOpen: boolean | false;
}

export interface FormData {
    platform: string;
    email: string;
    username: string;
    password: string;

    [key: string]: string;
}

const initFormData = {
    platform: '',
    email: '',
    username: '',
    password: '',
};

const handleSubmit = async (data: FormData) => {
    console.log('Submitted data: ', data);

    const postData = async () => {
        try {
            const response = await axios.post('/api/accounts/create', {
                ...data,
            });
            console.log('RESPONSE: ', response.data);
        } catch (error) {
            console.error('Error while submitting data: ', error);
        }
    };

    await postData();
};

export const AddNewAccountDiaLog: React.FC<AddNewAccountDiaLog> = ({ isOpen, onClick }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [fields, setFields] = useState<string[]>([]);
    const [formData, setFormData] = useState<FormData>(initFormData);
    const [newFieldValue, setNewFieldValue] = useState('');
    const endOfInputsReF = useRef<HTMLDivElement>(null);
    const strengthPassword = checkStrengthPassword(formData.password);

    useEffect(() => endOfInputsReF.current?.scrollIntoView({ behavior: 'smooth' }), [fields]);
    useEffect(() => console.log(formData), [formData]);

    const addNewField = () => {
        if (newFieldValue.trim() !== '') {
            if (fields.includes(newFieldValue)) return;
            setFields([...fields, newFieldValue]);
            setNewFieldValue('');
        }
    };

    const removeField = (index: number) => {
        const updatedFields = fields.filter((_, i) => i !== index);
        setFields(updatedFields);
        setFormData((prev) => {
            const updatedFormData = { ...prev };
            delete updatedFormData[fields[index]];
            return updatedFormData;
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleNewFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewFieldValue(e.target.value);

    if (!isOpen) return null;

    return (
        <div
            className={
                'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
            }
        >
            <Card
                data-aos="fade-up"
                data-aos-duration={'200'}
                data-aos-anchor-placement="top-bottom"
                className={'bg-[#151c25] rounded-2xl outline-none border-none w-[560px] relative'}
            >
                <Button onClick={onClick} className={'absolute right-0 my-4 mx-4 size-8 rounded-full'}>
                    <span>
                        <X className={'size-4'} />
                    </span>
                </Button>
                <CardHeader className={''}>
                    <CardTitle className={'font-bold text-xl'}>Add new account</CardTitle>
                </CardHeader>

                <ScrollArea className={'max-h-[400px] overflow-y-auto bg-transparent'}>
                    <CardContent className={'space-y-4 mt-6 w-full'}>
                        {['platform', 'email', 'username', 'password'].map((field) => (
                            <div key={field} className='space-y-1'>
                                <Label htmlFor={field} className="text-sm text-gray-200 font-semibold">
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                </Label>
                                <div className="flex items-center">
                                    <Input
                                        id={field}
                                        type={field === 'password' && !showPassword ? 'password' : 'text'}
                                        value={formData[field]}
                                        onChange={handleInputChange}
                                        className="rounded-none text-gray-100 text-xs border-b border-white/30 pl-0 focus:outline-none"
                                        placeholder={`Enter your ${field}`}
                                        autoComplete={field === 'password' ? 'new-password' : 'off'}
                                    />
                                    {field === 'password' && (
                                        <Button
                                            tabIndex={-1}
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="text-gray-400"
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </Button>
                                    )}
                                </div>
                                {field === 'password' && (
                                    <p
                                        className={`text-xs mt-1 ${
                                            strengthPassword === 'strong' ? 'text-green-500' : strengthPassword === 'medium' ? 'text-blue-500' : 'text-red-500'
                                        }`}
                                    >
                                        {strengthPassword}
                                    </p>
                                )}
                            </div>
                        ))}

                        {fields.map((field, index) => (
                            <div key={index}>
                                <Label htmlFor={`new-${field}`} className="text-xs text-gray-400 font-semibold">
                                    {field[0].toUpperCase() + field.slice(1)} <span className={'opacity-30'}>(optional)</span>
                                </Label>
                                <div className={'flex items-center'}>
                                    <Input
                                        id={field}
                                        value={formData[field] || ''}
                                        onChange={handleInputChange}
                                        className="rounded-none text-gray-100 text-xs border-b-[1px] pl-0 border-white/30 focus:outline-0 flex-grow"
                                        placeholder={`enter your ${field}`}
                                        autoFocus={index === fields.length - 1}
                                    />
                                    <Button tabIndex={-1} variant="ghost" size="icon" onClick={() => removeField(index)} className="text-gray-400 rounded-full">
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}

                        <form
                            className={'flex items-center space-x-2 mt-4'}
                            onSubmit={(e) => {
                                e.preventDefault();
                            }}
                        >
                            <Input
                                className="rounded-none text-gray-100 text-xs border-b-[1px] pl-0 border-white/30 focus:outline-0 flex-grow"
                                placeholder="Enter new field value"
                                value={newFieldValue}
                                onChange={handleNewFieldChange}
                                maxLength={30}
                            />
                            <Button tabIndex={-1} className={'flex justify-center items-center w-20'} onClick={addNewField} variant="default">
                                <span>
                                    <Plus className={'size-4'} />
                                </span>
                            </Button>
                        </form>
                        <div ref={endOfInputsReF} />
                    </CardContent>
                </ScrollArea>

                <CardFooter className="flex flex-col space-y-2">
                    <Button
                        variant="secondary"
                        className="w-full bg-blue-700 text-blue-100 hover:text-blue-300 hover:bg-gray-700"
                        onClick={() => handleSubmit(formData)}
                        disabled={!formData['username'] || !formData['email'] || !formData['platform'] || !formData['password']}
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};
