import { FormProps } from '@/pages/account';

export const idPattern = /^[a-zA-Z0-9가-힣]{2,12}$/;
export const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
export const phoneNumberPattern = /^01([0|1|6|7|8|9]?)-?[0-9]{3,4}-?[0-9]{4}$/;
export const namePattern = /^[가-힣]{2,4}$/;
export const studentIdPattern = /^[C|N][0-9]{4}$/;

export interface InputItem {
  name: keyof FormProps;
  text: string;
  required: string;
  pattern: RegExp;
  minValue: number;
  minValueMessage: string;
  maxValue: number;
  maxValueMessage: string;
}

export const INPUT_LIST: InputItem[] = [
  {
    // name: id from FormProps,
    name: 'id',
    text: '아이디를 입력하세요...',
    required: '아이디는 필수 입니다.',
    pattern: idPattern,
    minValue: 2,
    minValueMessage: '아이디는 2자 이상 입력해야 합니다.',
    maxValue: 12,
    maxValueMessage: '아이디는 12자 이하 입력해야 합니다.',
  },
  {
    name: 'name',
    text: '이름을 입력하세요...',
    required: '이름은 필수 입니다.',
    pattern: namePattern,
    minValue: 2,
    minValueMessage: '이름은 2자 이상 입력해야 합니다.',
    maxValue: 5,
    maxValueMessage: '이름은 5자 이하 입력해야 합니다.',
  },
  {
    name: 'studentId',
    text: '학번을 입력하세요...',
    required: '학번은 필수 입니다.',
    pattern: studentIdPattern,
    minValue: 5,
    minValueMessage: '학번은 5자 입니다.',
    maxValue: 5,
    maxValueMessage: '학번은 5자 입니다.',
  },
  {
    name: 'phoneNumber',
    text: '전화번호를 입력하세요...',
    required: '전화번호는 필수 입니다.',
    pattern: phoneNumberPattern,
    minValue: 13,
    minValueMessage: '전화번호는 13자 입니다.',
    maxValue: 13,
    maxValueMessage: '전화번호는 13자 입니다.',
  },
  {
    name: 'password',
    text: '비밀번호를 입력하세요...',
    required: '비밀번호는 필수 입니다.',
    pattern: passwordPattern,
    minValue: 8,
    minValueMessage: '비밀번호는 8자 이상 입력해야 합니다.',
    maxValue: 20,
    maxValueMessage: '비밀번호는 20자 이하 입력해야 합니다.',
  },
  {
    name: 'passwordCheck',
    text: '비밀번호 확인을 입력하세요...',
    required: '비밀번호 확인은 필수 입니다',
    pattern: passwordPattern,
    minValue: 8,
    minValueMessage: '비밀번호는 8자 이상 입력해야 합니다.',
    maxValue: 20,
    maxValueMessage: '비밀번호는 20자 이하 입력해야 합니다.',
  },
];
