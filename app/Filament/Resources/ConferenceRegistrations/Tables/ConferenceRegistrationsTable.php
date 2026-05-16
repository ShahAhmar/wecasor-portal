<?php

namespace App\Filament\Resources\ConferenceRegistrations\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ForceDeleteBulkAction;
use Filament\Actions\RestoreBulkAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;

class ConferenceRegistrationsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                TextColumn::make('email')
                    ->searchable()
                    ->copyable(),
                TextColumn::make('institution')
                    ->searchable()
                    ->toggleable(),
                TextColumn::make('country')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('role')
                    ->badge()
                    ->color('info'),
                TextColumn::make('attendance_type')
                    ->label('Type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Physical' => 'success',
                        'Virtual' => 'primary',
                        default => 'gray',
                    }),
                TextColumn::make('language')
                    ->formatStateUsing(fn (string $state): string => strtoupper($state))
                    ->badge(),
                TextColumn::make('created_at')
                    ->label('Registered On')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                \Filament\Tables\Filters\SelectFilter::make('role')
                    ->options([
                        'Clinician' => 'Clinician',
                        'Researcher' => 'Researcher',
                        'Student' => 'Student',
                        'Public Health Expert' => 'Public Health Expert',
                    ]),
                \Filament\Tables\Filters\SelectFilter::make('attendance_type')
                    ->options([
                        'Physical' => 'Physical',
                        'Virtual' => 'Virtual',
                    ]),
                TrashedFilter::make(),
            ])
            ->actions([
                EditAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                    ForceDeleteBulkAction::make(),
                    RestoreBulkAction::make(),
                    \Filament\Tables\Actions\ExportBulkAction::make()
                        ->label('Export Attendees List'),
                ]),
            ]);
    }
}
