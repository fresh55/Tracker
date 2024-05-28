import Image from 'next/image';

function Logo() {
    return (
        <div>
            <Image alt="Logo" src="/logo1.png" width={70}
                height={70} />
</div>
  )
}

export default Logo