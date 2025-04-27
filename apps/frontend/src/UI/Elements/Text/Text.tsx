import { cn } from '@/shared/helpers/style.utils';
import { Text as RadiText, TextProps } from '@radix-ui/themes';

export function Text(props: TextProps) {
  let additionalClasses = '';
  if (props.as === 'p') {
    additionalClasses = 'leading-7 [&:not(:first-child)]:mt-6';
  }

  return (
    <RadiText
      className={cn(props.className, additionalClasses)}
      {...props}
    />
  );
}
