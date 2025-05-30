'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Download } from 'lucide-react';

import { useUser } from 'components/context/auth-provider';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { useToast } from 'components/ui/use-toast';

import { exportTableToCsv } from 'lib/export';
import { formatDate } from 'lib/formatter';

import { dateFormat } from 'constants/date';
import messages from 'constants/messages';

import DataTableFilterOptions from './data-table-filter-options';
import DataTableViewOptions from './data-table-view-options';

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
	className?: String;
	loading: boolean;
	hideViewOptions?: boolean | undefined;
	user: { locale: string; currency: string; isPremium: boolean };
	filter: { name: string; setFilter: (filter: string) => void };
	filename: string;
}

export default function DataTableToolbar<TData>(props: DataTableToolbarProps<TData>) {
	const { table, className, loading, filter, user, filename, hideViewOptions = false } = props;
	const { toast } = useToast();
	const isFiltered = table.getState().columnFilters.length > 0;

	return (
		<div className={`mb-4 mt-10 flex flex-col items-center justify-between sm:flex-row ${className}`}>
			<div className="mb-4 flex w-full flex-1 items-center space-x-2 sm:mb-0 sm:max-w-[300px] md:max-w-[350px]">
				<Input
					disabled={loading}
					placeholder="Filter by name"
					value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
					onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
					className="h-8 w-[inherit]"
				/>
				{isFiltered && (
					<Button
						variant="secondary"
						onClick={() => table.resetColumnFilters()}
						className="h-8 px-2 text-primary lg:px-3"
					>
						Reset
						<Cross2Icon className="ml-3 h-4 w-4" />
					</Button>
				)}
			</div>
			<div className={`${loading ? 'pointer-events-none opacity-50' : ''} grid w-full grid-flow-col gap-3 sm:w-auto`}>
				{hideViewOptions ? null : <DataTableFilterOptions setFilter={filter?.setFilter} filter={filter.name} />}
				<DataTableViewOptions table={table} />
				{user.isPremium ? (
					<Button
						variant="outline"
						onClick={() => {
							toast({ description: messages.export, variant: 'info' });
							exportTableToCsv(
								`${filename} ${formatDate({ date: format(new Date(), dateFormat), locale: user.locale })}.csv`
							);
						}}
						size="sm"
						className="h-8 text-sm capitalize max-sm:px-1 lg:flex"
					>
						<Download className="mr-1.5 h-3.5 w-3.5 sm:inline-block" />
						Export
					</Button>
				) : null}
			</div>
		</div>
	);
}
