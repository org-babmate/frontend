import { useMutation } from '@tanstack/react-query';
import {resetPassword } from '@/entities/user/model/api';
import type { CommonResponse } from '@/entities/user/model/types';



export function  useResetPassword(onSuccess?: (data: CommonResponse) => void){
  const resetMutation = useMutation({  
    mutationFn: resetPassword,
    onSuccess: (data) => {
      onSuccess?.(data);
    },})
    return resetMutation
}