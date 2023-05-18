export interface GenerateCodeOptionListProps {
  value: string;
}

export interface GenerateCodeOptionProps {
  title: string;
  optionList: GenerateCodeOptionListProps[];
}

export const generateCodeOptionList: GenerateCodeOptionProps[] = [
  {
    title: '유효기간',
    optionList: [
      {
        value: '1일',
      },
      {
        value: '3일',
      },
      {
        value: '5일',
      },
      {
        value: '7일',
      },
    ],
  },
  {
    title: '최대 사용 횟수',
    optionList: [
      {
        value: '1회',
      },
      {
        value: '3회',
      },
      {
        value: '5회',
      },
      {
        value: '7회',
      },
    ],
  },
];
