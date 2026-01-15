'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  findPasswordSchema,
  type FindPasswordFormValues,
} from '@/features/auth/find-password/model/validation';

export function FindPasswordForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FindPasswordFormValues>({
    resolver: zodResolver(findPasswordSchema),
    mode: 'onBlur',
  });

  const { mutate, error, isPending } = useFindPassword(() => {
    router.push('/login');
  });

  const onSubmit = (values: FindPasswordFormValues) => {
    mutate(values);
  };

  const handleClick = handleSubmit(onSubmit);

  return (
    <div className="space-y-4 text-black">
      <h1 className="text-xl font-semibold">비밀번호 찾기</h1>

      <input
        type="email"
        placeholder="이메일"
        className="bg-gray-200 rounded-sm px-3 py-1 ty-body-1-regular"
        {...register('email')}
      />

      {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}

      {error && <p className="text-xs text-red-500">요청 처리 중 오류가 발생했습니다.</p>}

      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className="w-full mt-2 bg-gray-400 py-2 rounded-sm disabled:opacity-60"
      >
        {isPending ? '찾는 중…' : '비밀번호 찾기'}
      </button>
    </div>
  );
}
function useFindPassword(arg0: () => void): { mutate: any; error: any; isPending: any } {
  throw new Error('Function not implemented.');
}
